<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstitutionUserPosition extends Model
{
    use HasFactory;
    protected $table = 'institution_user_positions';
    protected $fillable = ['user_id', 'position_id', 'institution_id'];

    // Define Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id');
    }

    public function institution()
    {
        return $this->belongsTo(InstitutionList::class, 'institution_id');
    }
}
