<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoachLogin extends Model
{
    protected $table = 'coach_logins';

    protected $fillable = [
        'image',
        'first_name',
        'last_name',
        'contact',
        'description',
        'sports',
        'city',
        'available',
        'available_from',
        'available_to',
        'cost',
        'TokenId',
    ];
    protected $casts = [
        'available' => 'string',
    ];
}
