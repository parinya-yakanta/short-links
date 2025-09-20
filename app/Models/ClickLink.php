<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClickLink extends Model
{
    protected $table = "click_links";

    protected $fillable = [
        'short_link_id',
        'ip_address',
        'user_agent',
    ];
    public $timestamps = false;

    public function clicks()
    {
        return $this->belongsTo(ShortLink::class);
    }

    public function shortLink()
    {
        return $this->belongsTo(ShortLink::class);
    }
}