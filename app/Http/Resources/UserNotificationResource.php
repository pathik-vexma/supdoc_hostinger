<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserNotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'sender_id' => $this->sender_id,
            'receiver_id' => $this->receiver_id,
            'message' => $this->message,
            'type' => $this->type,
            'created_at' => $this->created_at,
            'employee' => new UserResource($this->user),
            'order_id'=>$this->order_id,
            'inquiry_id'=>$this->inquiry_id,
            'quotation_id'=>$this->quotation_id 
        ];
    
    }
}
