<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleList extends Model
{
    use HasFactory;
    protected $table = 'schedule_lists';
    protected $primaryKey = 'id';
    public $incrementing = false; 
    protected $keyType = 'string';
    protected $fillable = ['id', 'day', 'lab_id', 'subject_id', 'user_id', 'class_id'];

    // Define Relationships
    public function lab()
    {
        return $this->belongsTo(Laboratory::class, 'lab_id');
    }

    public function subject()
    {
        return $this->belongsTo(SubjectList::class, 'subject_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function class()
    {
        return $this->belongsTo(ClassList::class, 'class_id');
    }
}
