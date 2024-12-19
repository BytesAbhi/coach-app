<?php

namespace App\Http\Controllers;

use App\Models\CoachLogin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CoachLoginController extends Controller
{

    public function index()
    {
        return CoachLogin::all();
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
                'first_name' => 'nullable|string|max:255',
                'last_name' => 'nullable|string|max:255',
                'contact' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'sports' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:255',
                'available' => 'nullable|string',
                'available_from' => 'nullable|date_format:H:i',
                'available_to' => 'nullable|date_format:H:i',
                'cost' => 'nullable|numeric',
                'TokenId' => 'required|string',
            ]);

            $TokenId = $request->TokenId ?? Str::random(128);

            $imagePath = null;

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('coach_pictures', 'public');
                Log::info('Image stored at: ' . $imagePath);
            } else {
                Log::warning('No image found in the request.');
            }

            $coach = CoachLogin::create([
                'image' => $imagePath,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'contact' => $request->contact,
                'description' => $request->description,
                'sports' => $request->sports,
                'city' => $request->city,
                'available' => $request->available,
                'available_from' => $request->available_from,
                'available_to' => $request->available_to,
                'cost' => $request->cost,
                'TokenId' => $TokenId,
            ]);

            // Return the coach data including the generated token ID
            return response()->json([
                'coach' => $coach,
                'TokenId' => $TokenId
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error storing coach login: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'error' => 'Failed to create coach login.',
                'details' => config('app.debug') ? $e->getMessage() : 'An error occurred. Please try again later.'
            ], 500);
        }
    }

    public function show($id)
    {
        return CoachLogin::findOrFail($id);
    }
    public function update(Request $request, $id)
    {
        $coach = CoachLogin::findOrFail($id);


        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'contact' => 'string|max:255',
            'description' => 'string',
            'sports' => 'string|max:255',
            'city' => 'string|max:255',
            'available' => 'array',
            'available_from' => 'date_format:H:i',
            'available_to' => 'date_format:H:i',
            'cost' => 'required|numeric',
            'TokenId' => 'required|string',
        ]);

        $imagePath = $coach->image;


        if ($request->hasFile('image')) {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('coach_pictures', 'public');
            Log::info('Image updated at: ' . $imagePath);
        }

        $coach->update(array_merge($request->all(), ['image' => $imagePath]));

        return response()->json($coach);
    }

    public function destroy($id)
    {
        $coach = CoachLogin::findOrFail($id);


        if ($coach->image) {
            Storage::disk('public')->delete($coach->image);
            Log::info('Deleted image: ' . $coach->image);
        }

        $coach->delete();

        return response()->json(['message' => 'Coach deleted successfully'], 204);
    }
}
