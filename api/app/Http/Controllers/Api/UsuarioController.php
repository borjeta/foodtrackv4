<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\usuario;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
        $usuario = new usuario();
        $usuario->nombre = $request->nombre;
        $usuario->apellidos = $request->apellidos;
        $usuario->email = $request->email;
        $usuario->password = password_hash($request->password, PASSWORD_DEFAULT);
        $usuario->save();
        return $usuario;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, usuario $usuario)
    {
        /* miramos la peticion tiene token valido y en la fecha de uso */
        if ($request->api_token == $usuario->api_token && $usuario->expires_at > now()) {
            return $usuario;
        }
        return response()->json(['error' => 'No tienes permisos para acceder a este recurso'], 401);
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
                $role = $usuario->role;
                $user_id = $usuario->id;
                $usuario->api_token = $token;
                $usuario->date_createtoken = now();
                $usuario->expires_at = now()->addDays(1);

                $usuario->save();
                return response()->json(['token' => $token, 'user_id' => $user_id, 'role' => $role], 200);
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

    public function buscaUsuario(Request $request)
    {
        $api_token = $request->header('Authorization');
        $usuario = usuario::where('api_token', $api_token)->first();
        return response()->json(['api_token' => $api_token], 200);
        /*
        if (
            $usuario && $usuario->expires_at > now()
            && $usuario->id == $request->user_id && $usuario->role == $request->role
        ) {
            return $usuario;
        }
        return response()->json(['error' => 'No tienes permisos para acceder a este recurso'], 401);
    */
    }
}
