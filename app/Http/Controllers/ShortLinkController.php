<?php

namespace App\Http\Controllers;

use App\Models\ShortLink;
use App\Traits\ClickLinkLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ShortLinkController extends Controller
{
    use ClickLinkLog;
    public function index(Request $request)
    {
        $user = $request->user();

        $links = ShortLink::withCount('clicks');
        $links = $links->with('user:id,name');
        
        if ($user->role !== 'admin') {
            $links = $links->where('user_id', $user->id);
        }

        $links = $links->where('expires_at', '>', now());
        $links = $links->orderBy('created_at', 'desc');
        $links = $links->get();

        $baseUrl = url('/');

        return Inertia::render('my-links', [
            'links' => $links,
            'baseUrl' => $baseUrl,
        ]);
    }

    public function generate()
    {
        return Inertia::render('welcome');
    }

    public function store(Request $request)
    {
        $request->validate(['url' => 'required|url']);
        $shortCode = Str::random(6);
        $shortLink = "{$shortCode}";
        $fullLink = url($shortLink);

        try {
            $user = $request->user();

            if (! $user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $data = [
                'user_id' => $user->id,
                'name' => $shortCode,
                'full' => $request->url,
                'short' => $shortLink,
                'expires_at' => now()->addDays(30),
            ];

            DB::transaction(function () use ($data) {
                ShortLink::create($data);
            });

            return response()->json(['short_link' => $fullLink]);
        } catch (\Exception $e) {
            dd($e->getMessage());
            return response()->json(['error' => 'Failed to create short link'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate(['short_link' => 'required|string']);
        $shortCode = $request->short_link;
        $shortLink = "{$shortCode}";
        $fullLink = url($shortLink);

        try {
            $user = $request->user();

            if (! $user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $link = ShortLink::where('id', $id);
            if ($user->role !== 'admin') {
                $link = $link->where('user_id', $user->id);
            }
            $link = $link->first();

            if (! $link) {
                return response()->json(['error' => 'Link not found'], 404);
            }
            $data = [
                'short' => $shortLink,
            ];

            DB::transaction(function () use ($data, $link) {
                $link->update($data);
            });

            return response()->json(['short_link' => $fullLink]);
        } catch (\Exception $e) {
            dd($e->getMessage());
            return response()->json(['error' => 'Failed to update short link'], 500);
        }
    }

    public function destroy($id, Request $request)
    {
        try {
            $user = $request->user();

            if (! $user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $link = ShortLink::where('id', $id);
            if ($user->role !== 'admin') {
                $link = $link->where('user_id', $user->id);
            }
            $link = $link->first();

            if (! $link) {
                return response()->json(['error' => 'Link not found'], 404);
            }

            DB::transaction(function () use ($link) {
                $link->delete();
            });

            return response()->json(['message' => 'Link deleted successfully']);
        } catch (\Exception $e) {
            dd($e->getMessage());
            return response()->json(['error' => 'Failed to delete short link'], 500);
        }
    }

    public function redirect($code, Request $request)
    {
        $link = ShortLink::where('short', $code)
            ->where('expires_at', '>', now())
            ->first();

        if (! $link) {
            return redirect('/')->with('error', 'Link not found or expired');
        }

        $this->clickLink($link);
        return redirect()->away($link->full);
    }
}
