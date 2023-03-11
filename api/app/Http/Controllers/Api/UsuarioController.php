<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Str;




class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return usuario::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(usuario $usuario)
    {
        return $usuario;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, usuario $usuario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(usuario $usuario)
    {
        //
    }
    public function login(Request $request)
    {
        $usuario = usuario::where('email', $request->email)->first();
        if ($usuario) {
            if (password_verify($request->password, $usuario->password)) {
                /* Si el usuario existe y la contraseña es correcta , generamos el token con 60 caracteres aleatorios */
                $token = Str::class::random(60);
                /*guardamos el token en la base de datos */
                $usuario->api_token = $token;
                /*y actualizamos la fecha de creación del token y la fecha de expiración */
                $usuario->date_createtoken = now();
                $usuario->expires_at = now()->addDays(1);
                $usuario->save();
                return response()->json(['token' => $token], 200);
            }
        }
        return response()->json(['error' => 'Usuario o contraseña incorrectos'], 401);
    }

    public function logout(Request $request)
    {
        $usuario = usuario::where('api_token', $request->api_token)->first();
        if ($usuario) {
            $usuario->api_token = null;
            $usuario->date_createtoken = null;
            $usuario->expires_at = null;
            $usuario->save();
            return response()->json(['message' => 'Sesión cerrada correctamente'], 200);
        }
        return response()->json(['error' => 'No se ha podido cerrar la sesión'], 401);
    }
}
