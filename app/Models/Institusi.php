<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institusi extends Model
{
    use HasFactory;

    // Define the table name if it differs from the default
    protected $table = 'institusi';

    // Define fillable columns
    protected $fillable = [
        'nama_institusi', // Example column, modify it according to your schema
    ];

    // Define relationships if any
    public function jenisInstitusi()
    {
        return $this->hasMany(JenisInstitusi::class);
    }
}
