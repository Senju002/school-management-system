<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstitutionGroup extends Model {
    use HasFactory;
    protected $table = 'institution_group';
    protected $primaryKey = 'id';
    protected $fillable = ['ins_group_id', 'ins_group_name'];
}

