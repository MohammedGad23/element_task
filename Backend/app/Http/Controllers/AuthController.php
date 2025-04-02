<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Resources\UsersResource;
class AuthController extends Controller
{
    //

    public function users(){
        $users = User::where('role','user')->get();

        return UsersResource::collection($users);
    }

    public function login(LoginRequest $request)
    {
        try{
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
        catch(\Throwable $th){
            return response()->json([
                'error' => 'Something went wrong.'
            ], 500);
        }
    }

    public function createUser(CreateUserRequest $request)
    {
        try{

            $user = User::create($request->array());
            return response()->json([
                'Created' => $user
            ], 200);
        }
        catch(\Throwable $th){
            return response()->json([
                'error' => 'Something went wrong.'
            ], 500);
        }
    }


    public function logout(Request $request)
    {
        try{

            $user = $request->user();
                        // return $user;
            if ($user) {

                    $user->tokens()->delete();
                
                return response()->json([
                    "message" => "Logged out successfully"
                ],200);
            }
            return response()->json([
                "message" => "User not authenticated"
            ], 404);
        }catch(\Throwable $th){
            return response()->json([
                "message" => $th->getMessage()
            ], 500);
        }
    }
}
