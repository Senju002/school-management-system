<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstitutionList extends Model {
    use HasFactory;
    protected $table = 'institution_lists';
    protected $fillable = ['ins_id', 'ins_name'];
}

