<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectList extends Model
{
    use HasFactory;
    protected $table = 'subject_lists';
    protected $primaryKey = 'id';
    public $incrementing = false; 
    protected $keyType = 'string';
    protected $fillable = ['id', 'ins_id','subject_name'];

    public function institution()
    {
        return $this->belongsTo(InstitutionList::class, 'ins_id');
    }
}
