<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class UserController extends Controller
{
    public function index($id){
        $user = Redis::get('user_'.$id);
        if(isset($user)){
            $user = json_decode($user,FALSE);

            return response()->json([
                'status_code' => 201,
                'message' => 'Fetched from redis',
                'data' => $user,
            ]);
        }else{
            $user = User::find($id);
            Redis::set('user_'.$id,$user,'EX',60);

            return response()->json([
                'status_code' => 201,
                'message' => 'Fetched from database',
                'data' => $user,
            ]);
        }
    }
}

