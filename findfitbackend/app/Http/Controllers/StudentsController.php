<?php

namespace App\Http\Controllers;

use App\Models\Students;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class StudentsController extends Controller
{
     // Display a listing of students
     public function index()
     {
         return Students::all();
     }
     
     public function store(Request $request)
     {
         $request->validate([
             'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
             'first_name' => 'required',
             'last_name' => 'required',
             'email' => 'required|email|unique:students',
             'age' => 'nullable',
             'sports' => 'nullable',
             'gender' => 'nullable',
             'reg_as' => 'nullable',
             'TokenId' => 'nullable',
         ]);
     
         $imagePath = null;
         if ($request->hasFile('image')) {
             $imagePath = $request->file('image')->store('students_pictures', 'public');
             Log::info('Image stored at: ' . $imagePath);
         } else {
             Log::warning('No image found in the request.');
         }
     
         // Generate a 128-character token
         $token = Str::random(128);
     
         $student = Students::create([
             'image' => $imagePath,
             'first_name' => $request->first_name,
             'last_name' => $request->last_name,
             'email' => $request->email,
             'age' => $request->age,
             'sports' => $request->sports,
             'gender' => $request->gender,
             'reg_as' => $request->reg_as,
             'TokenId' => $token,
         ]);
     
         // Return the student details along with the token in the response
         return response()->json([
             'student' => $student,
             'token' => $token
         ], 201);
     }
 
 
     public function show($id)
     {
         return Students::findOrFail($id);
     }
 
 
     public function update(Request $request, $id)
     {
         $student = Students::findOrFail($id);
 
         $request->validate([
             'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
             'first_name' => 'required',
             'last_name' => 'required',
             'email' => 'required|email|unique:students,email,' . $id,
             'age' => 'nullable',
             'sports' => 'nullable',
             'gender' => 'nullable',
             'reg_as' => 'nullable',
             'TokenId' => 'nullable',
         ]);
 
         $imagePath = null;
 
         if ($request->hasFile('image')) {
             $imagePath = $request->file('image')->store('students_pictures', 'public');
             Log::info('Image stored at: ' . $imagePath);
         } else {
             Log::warning('No image found in the request.');
         }
 
         $student->update([
             'image' => $student->image,
             'first_name' => $request->first_name,
             'last_name' => $request->last_name,
             'email' => $request->email,
             'age' => $request->age,
             'sports' => $request->sports,
             'gender' => $request->gender,
             'reg_as' => $request->reg_as,
             'TokenId' => $request->TokenId,
         ]);
 
         return response()->json($student);
     }
 
 
     public function destroy($id)
     {
         $student = Students::findOrFail($id);
 
         if ($student->image) {
             Storage::disk('public')->delete($student->image);
         }
 
         $student->delete();
 
         return response()->json(['message' => 'Student deleted successfully']);
     }
 }
 