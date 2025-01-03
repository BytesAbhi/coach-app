<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    use HasFactory;

    protected $fillable = ['image', 'first_name', 'last_name', 'email', 'age', 'sports', 'gender', 'reg_as', 'TokenId'];
}
