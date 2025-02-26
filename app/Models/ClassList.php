<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassList extends Model
{
    use HasFactory;
    protected $table = 'class_lists';
    protected $primaryKey = 'id';
    public $incrementing = false; // Since we're using a string ID
    protected $keyType = 'string';
    protected $fillable = ['id', 'ins_id','ins_type_id','class_name',];

    public function institution_type()
    {
        return $this->belongsTo(InstitutionType::class, 'ins_type_id');
    }

    public function institution_list()
    {
        return $this->belongsTo(InstitutionList::class, 'ins_id');
    }
}
