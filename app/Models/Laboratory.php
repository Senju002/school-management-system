<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laboratory extends Model
{
    use HasFactory;
    protected $table = 'lab_computers';
    protected $primaryKey = 'id';
    public $incrementing = false; // Since we're using a string ID
    protected $keyType = 'string';
    protected $fillable = ['id', 'ins_id','lab_name',];

    public function institution()
    {
        return $this->belongsTo(InstitutionList::class, 'ins_id');
    }
}
