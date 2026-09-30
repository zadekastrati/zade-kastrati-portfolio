<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactMessageRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactController extends Controller
{
    public function store(StoreContactMessageRequest $request): JsonResponse
    {
        $contact = ContactMessage::create([
            ...$request->safe()->only(['name', 'email', 'subject', 'message']),
            'ip_address' => $request->ip(),
        ]);

        // The message is already persisted, so a mail failure must not fail the request.
        try {
            Mail::raw(
                "From: {$contact->name} <{$contact->email}>\n\n{$contact->message}",
                fn ($mail) => $mail
                    ->to(config('portfolio.profile.email'))
                    ->replyTo($contact->email, $contact->name)
                    ->subject('Portfolio: '.($contact->subject ?: 'New message from '.$contact->name))
            );
        } catch (Throwable $e) {
            Log::warning('Contact notification mail failed', ['id' => $contact->id, 'error' => $e->getMessage()]);
        }

        return response()->json(['message' => 'Thank you. Your message has been sent successfully.'], 201);
    }
}
