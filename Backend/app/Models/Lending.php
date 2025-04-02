<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lending extends Model
{
    //
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'lend_date',
        'return_date',
        'is_returned'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
