<?php

namespace App\Http\Controllers;

use App\Models\Testing;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class TestingController extends Controller
{
    
    public function index()
    {
        return Testing::all();
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'testname' => 'required',
            'testpassword' => 'required',
        ]);
    
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('TestImages', 'public');
            Log::info('Image stored at: ' . $imagePath);
        } else {
            Log::warning('No image found in the request.');
        }
    
        $student = Testing::create([
            'image' => $imagePath,
            'testname' => $request->testname,
            'testpassword' => $request->testpassword,
        ]);
    
        return response()->json($student, 201);
    }

    public function show($id)
    {
        return Testing::findOrFail($id);
    }


    public function update(Request $request, $id)
    {
        $student = Testing::findOrFail($id);
    
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'testname' => 'required',
            'testpassword' => 'required',
        ]);
    
        $imagePath = $student->image;
    
        if ($request->hasFile('image')) {
            if ($student->image) {
                Storage::disk('public')->delete($student->image);
            }
            $imagePath = $request->file('image')->store('TestImages', 'public');
            Log::info('Image updated and stored at: ' . $imagePath);
        }
    
        $student->update([
            'image' => $imagePath,
            'testname' => $request->testname,
            'testpassword' => $request->testpassword,
        ]);
    
        return response()->json($student);
    }


    public function destroy($id)
    {
        $student = Testing::findOrFail($id);

        if ($student->image) {
            Storage::disk('public')->delete($student->image);
        }

        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }
}
