<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\foodtruck;
use Illuminate\Http\Request;

class FoodtruckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return foodtruck::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //guarda una foodtruck en bd
        $foodtruck = new foodtruck();
        $foodtruck->name = $request->name;
        $foodtruck->description = $request->description;
        $foodtruck->save();
        return $foodtruck;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //busca la foodtruck por id
        $foodtruck = foodtruck::find($id);
        return $foodtruck;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, foodtruck $foodtruck)
    {

        $api_token =  $request->header('api_token');
        $user_id = $request->header('user_id');
        $role = $request->header('role');

        /*buscamos en bases de datos la foodtruck con id de la foodtruck y el id del usuario que la creo*/
        $foodtruck = foodtruck::where('id', $foodtruck->id)->where('user_id', $user_id)->first();

        $foodtruck->nombre = $request->nombre;
        $foodtruck->descripcion = $request->descripcion;
        $foodtruck->status = $request->status;
        $foodtruck->avatar = $request->avatar;
        $foodtruck->telefono = $request->telefono;
        $foodtruck->ubicacion = $request->ubicacion;
        $foodtruck->horario = $request->horario;
        $foodtruck->TipoComida = $request->tipocomida;
        $foodtruck->user_id = $user_id;
        $foodtruck->save();

        return $foodtruck;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(foodtruck $foodtruck)
    {
    }

    public function getFoodtrucksByUser($id)
    {
        $foodtrucks = foodtruck::where('user_id', $id)->get();
        return $foodtrucks;
    }
    public function abrirfoodtruck($id)
    {
        $foodtruck = foodtruck::find($id);
        $foodtruck->status = 'Activo';
        $foodtruck->save();
        return $foodtruck;
    }

    public function cerrarfoodtruck($id)
    {
        $foodtruck = foodtruck::find($id);
        $foodtruck->status = 'Inactivo';
        $foodtruck->save();
        return $foodtruck;
    }
}
