<?php

namespace App\Models;

use App\DAO\AccountDAO;
use App\Enum\TransactionType;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use InvalidArgumentException;
use stdClass;

class Account extends BaseModel
{
    /**
     * Mass assinable attributes.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'number',
    ];

    /**
     * The attributes that should always be appended.
     *
     * @var array
     */
    protected $appends = ['balance'];

    /**
     * Custom balance attribute of Account.
     * @return stdClass
     *
     * @throws InvalidArgumentException
     */
    public function getBalanceAttribute()
    {
        return AccountDAO::getBalance($this);
    }

    /**
     * Owner of this Account.
     *
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * All Transactions of this Account.
     *
     * @return HasMany
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * All incomes of this Account.
     *
     * @return Collection
     *
     * @throws InvalidArgumentException
     */
    public function incomes()
    {
        return $this->transactions()->where('type', TransactionType::INCOME)->get();
    }

    /**
     * All expenses of this Account.
     *
     * @return Collection
     *
     * @throws InvalidArgumentException
     */
    public function expenses()
    {
        return $this->transactions()->where('type', TransactionType::EXPENSE)->get();
    }
}
