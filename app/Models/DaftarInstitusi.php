<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaftarInstitusi extends Model {
    use HasFactory;
    protected $table = 'daftar_institusi';
    protected $fillable = ['kode_ins', 'nama_ins'];
}

