<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PositionGrade extends Model
{
    use HasFactory;

    protected $table = 'position_grades';
    protected $primaryKey = 'id';
    public $incrementing = false; // Since we're using a string ID
    protected $keyType = 'string';
    protected $fillable = ['id', 'job_level'];
    protected $hidden = ['created_at', 'updated_at'];
}
