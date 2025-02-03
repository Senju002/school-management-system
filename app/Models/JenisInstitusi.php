<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisInstitusi extends Model {
    use HasFactory;
    protected $table = 'jenis_institusi';
    protected $fillable = ['kode_jenis_ins', 'nama_jenis_ins'];
}
