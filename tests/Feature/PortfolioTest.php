<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_embeds_portfolio_content(): void
    {
        $this->withoutVite()
            ->get('/')
            ->assertOk()
            ->assertSee('Zade Kastrati')
            ->assertSee('bone-active.com');
    }

    public function test_contact_message_is_stored(): void
    {
        $this->postJson('/contact', [
            'name' => 'Recruiter',
            'email' => 'recruiter@example.com',
            'subject' => 'Opportunity',
            'message' => 'We would love to talk to you about a role.',
        ])->assertCreated();

        $this->assertDatabaseHas('contact_messages', [
            'email' => 'recruiter@example.com',
            'subject' => 'Opportunity',
        ]);
    }

    public function test_contact_message_is_validated(): void
    {
        $this->postJson('/contact', ['name' => '', 'email' => 'not-an-email', 'message' => 'short'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'message']);

        $this->assertSame(0, ContactMessage::count());
    }

    /**
     * @return array<string, array{string}>
     */
    public static function invalidEmails(): array
    {
        return [
            'no at sign' => ['abc'],
            'no domain ending' => ['test@test'],
            'missing .com' => ['zade@gmail'],
            'one-letter ending' => ['a@b.c'],
            'double at' => ['user@@x.com'],
            'double dot' => ['x@y..com'],
            'contains space' => ['a b@gmail.com'],
        ];
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('invalidEmails')]
    public function test_invalid_email_is_rejected(string $email): void
    {
        $this->postJson('/contact', [
            'name' => 'Visitor',
            'email' => $email,
            'message' => 'Hello there, this is a test.',
        ])->assertUnprocessable()->assertJsonValidationErrors(['email']);

        $this->assertSame(0, ContactMessage::count());
    }

    public function test_real_world_email_formats_are_accepted(): void
    {
        foreach (['first.last@company.co.uk', 'zade.kastrati+jobs@gmail.com'] as $email) {
            $this->postJson('/contact', [
                'name' => 'Visitor',
                'email' => $email,
                'message' => 'Hello there, this is a test.',
            ])->assertCreated();
        }
    }

    public function test_honeypot_rejects_bots(): void
    {
        $this->postJson('/contact', [
            'name' => 'Bot',
            'email' => 'bot@example.com',
            'message' => 'Buy cheap followers now!!!',
            'website' => 'https://spam.example',
        ])->assertUnprocessable();

        $this->assertSame(0, ContactMessage::count());
    }

    public function test_contact_endpoint_is_rate_limited(): void
    {
        $payload = ['name' => 'A', 'email' => 'a@example.com', 'message' => 'Hello there, this is a test.'];

        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/contact', $payload)->assertCreated();
        }

        $this->postJson('/contact', $payload)->assertTooManyRequests();
    }
}
