<?php

namespace App\Traits;

use App\Models\ShortLink;

trait ClickLinkLog
{
    public function clickLink(ShortLink $link)
    {
        $link->clicks()->create(
            [
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'created_at' => now(),
                'updated_at' => now()
            ]
        );
    }
}
