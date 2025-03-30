<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lending extends Model
{
    //
    protected $fillable = [
        'user_id',
        'lend_date',
        'return_date',
    ];
}
