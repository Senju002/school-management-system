<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstitutionList extends Model
{
    use HasFactory;
    protected $table = 'institution_lists';
    protected $primaryKey = 'id';
    public $incrementing = false; // Since we're using a string ID
    protected $keyType = 'string';
    protected $fillable = ['id', 'ins_name'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'institution_user_positions')
            ->withPivot('position_id')
            ->withTimestamps();
    }
}
