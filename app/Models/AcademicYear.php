<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    use HasFactory;
    protected $table = 'academic_years';
    protected $primaryKey = 'id';
    public $incrementing = false; // Since we're using a string ID
    protected $keyType = 'string';
    protected $fillable = ['id', 'ac_years'];
}
