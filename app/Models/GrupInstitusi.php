<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrupInstitusi extends Model {
    use HasFactory;
    protected $table = 'grup_institusi';
    protected $fillable = ['kode_grup_ins', 'nama_grup_ins'];
}

