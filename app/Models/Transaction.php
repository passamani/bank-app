<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Transaction extends BaseModel
{
    /**
     * Mass assignable attributes.
     *
     * @var array
     */
    protected $fillable = [
        'account_id',
        'type',
        'amount',
        'status',
        'description',
        'date',
        'check_image',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['account'];

    /**
     * Account of this Transaction.
     *
     * @return BelongsTo
     */
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
