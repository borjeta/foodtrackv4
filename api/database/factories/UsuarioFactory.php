<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use App\Models\usuario;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usuario>
 */
class UsuarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
            'api_token' => Str::random(80),
            'date_createtoken' => now(),
            'expires_at' => now()->addDays(1),
            'role' => 'user',
            'avatar' => null,
            'telefono' => null,
            'ubicacion' => null,
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
