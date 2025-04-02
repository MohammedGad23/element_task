<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LendingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user'=>[
                'name' => $this->user->name,
                'email' => $this->user->email,
                'phone_number' => $this->user->phone_number,
            ],
            'book' =>[
                'id'=>$this->id,
                'lending_date' => $this->lend_date ? date('d-m-Y', strtotime($this->lend_date)) : null,
                'return_date' => $this->return_date?date('d-m-Y', strtotime($this->return_date)) : null,
            ],
        ];
    }
}
