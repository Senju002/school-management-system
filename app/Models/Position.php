<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;

    protected $table = 'positions';
    protected $primaryKey = 'id';
    public $incrementing = false; // Since we're using a string ID
    protected $keyType = 'string';
    protected $fillable = ['id', 'position_name'];
    protected $hidden = ['created_at', 'updated_at'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'institution_user_positions')
            ->withPivot('institution_id')
            ->withTimestamps();
    }
}
