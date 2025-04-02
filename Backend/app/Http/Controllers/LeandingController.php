<?php

namespace App\Http\Controllers;

use App\Models\Lending;
use Illuminate\Http\Request;
use App\Http\Requests\LendingRequest;
use App\Http\Resources\LendingResource;


class LeandingController extends Controller
{


    public function lendingBook(LendingRequest $request)
    {
        try {
            $lendedBook = Lending::orderBy('id', 'desc')->first();

            if($lendedBook->is_returned == 0){
                return response()->json([
                    'message'=>'the book not returned.'
                ],403);
            }

            $now_date = now()->toDateString();
            $lending = Lending::create([
                'user_id' => $request->user_id,
                'lend_date' => $now_date,
                'return_date' => $request->return_date
            ]);

            return response()->json([
                'Created' => $lending
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }

    }

    public function returnBook()
    {
        try {
            $lendedBook = Lending::orderBy('id', 'desc')->first();

            $lendedBook->update([
                'is_returned' => true
            ]);
            $lendedBook->save();

            return response()->json([
                'Updated' => 'The book was returned successfully.',
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Something went wrong.'
            ], 500);
        }

    }

    public function getLendedBook()
    {
        try {

            $lendedBook = Lending::orderBy('id', 'desc')->first();

            if($lendedBook->is_returned == 1){
                return response()->json([
                    'message'=>'The book returned.'
                ],403);
            }
            return new LendingResource($lendedBook);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Something went wrong.'
            ], 500);
        }
    }

}
