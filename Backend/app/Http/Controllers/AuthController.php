<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\CreateUserRequest;
class AuthController extends Controller
{
    //

    public function login(LoginRequest $request)
    {
        // return $request->all();
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => ['The user login or password is incorrect.'],
            ], 402);
        }

        return response()->json([
            'token' => $user->createToken($request->password)->plainTextToken,
            'role' => $user->role,
        ], 200);
    }

    public function createUser(CreateUserRequest $request)
    {
        //
        // return $request->all();
        $user = User::create($request->array());
        return response()->json([
            'Created' => $user
        ], 200);
    }
}
