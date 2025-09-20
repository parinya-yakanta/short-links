<?php

namespace App\Console\Commands;

use App\Models\ShortLink;
use Illuminate\Console\Command;

class CleanShortLink extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'short-links:clean-short-link';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean short links on over 1 year old';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Cleaning short links older than 1 year...');

        try {
            $deletedCount = ShortLink::where('created_at', '<', now()->subYear())->delete();

            $this->info("Deleted {$deletedCount} short links older than 1 year.");
        } catch (\Exception $e) {
            $this->error('An error occurred while cleaning short links: ' . $e->getMessage());
        }
    }
}
