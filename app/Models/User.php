<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    // Relationship with worker_roles (Many-to-Many)

    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function institutions()
    {
        return $this->belongsToMany(InstitutionList::class, 'institution_user_positions')
            ->withPivot('position_id')
            ->withTimestamps();
    }

    public function positions()
    {
        return $this->belongsToMany(Position::class, 'institution_user_positions')
            ->withPivot('institution_id')
            ->withTimestamps();
    }
}
