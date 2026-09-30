<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            // The plain `email` rule accepts addresses like "test@test", so also
            // require a real domain ending (at least two letters, e.g. .com, .co.uk).
            'email' => ['required', 'string', 'max:150', 'email:rfc,strict', 'regex:/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i'],
            'subject' => ['nullable', 'string', 'max:150'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
            // Honeypot: hidden from humans, bots tend to fill it in.
            'website' => ['prohibited'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name.',
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address, like name@example.com.',
            'email.regex' => 'Please enter a valid email address, like name@example.com.',
            'message.required' => 'Please write a message.',
            'message.min' => 'Your message should be at least 10 characters long.',
        ];
    }
}
