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
    public function show(foodtruck $foodtruck)
    {
        //busca la foodtruck por id
        $foodtruck = foodtruck::find($foodtruck->id);


        return $foodtruck;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, foodtruck $foodtruck)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(foodtruck $foodtruck)
    {
        //
    }
}
