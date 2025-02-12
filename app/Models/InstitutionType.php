<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstitutionType extends Model {
    use HasFactory;
    protected $table = 'institution_type';
    protected $primaryKey = 'id';
    public $incrementing = false; // Since we're using a string ID
    protected $keyType = 'string';
    protected $fillable = ['id', 'ins_type_name'];
}
