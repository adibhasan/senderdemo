<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class SubscriberController extends Controller
{
    const GENERAL_KEYS = 'subscribers';
    const PAGE_SIZE = 20;
    const CACHE_EXPIRY_INSECOND = 60;
    const SEARCH_COLUMN = 'birth_day';
    
    public $year;
    public $month;
    public $key;


    public function index(){

        return view('subscriber.index');
    }

    public function getSubscriber(Request $request){
        $request->validate([
            'year' => 'nullable|sometimes|digits:4|integer|min:1000|max:'.(date('Y')+1),
            'month' => 'nullable|sometimes|integer|min:1|max:12'
        ]);

        $this->year = $request->input('year')??0;
        $this->month = $request->input('month')??0;
        $this->key = $this->searchKeys();
        $subscribers = Redis::get($this->key);
        $message = "Fetched from database.";
        if(isset($subscribers) && !empty($subscribers)){
            $subscribers = json_decode($subscribers,FALSE);
            $message = "Fetched from redis.";
        }else{
            $subscribers = $this->pagingData();
            Redis::set($this->key,json_encode($subscribers),'EX',self::CACHE_EXPIRY_INSECOND);
        }
        
        return response()->json([
            'status' => 200,
            'message' => $message,
            'data' => $this->pagingData(),
            'searchInfo'=> $this->searchKeys()
        ]);

    }

    private function pagingData(){
        if($this->year == 0 && $this->month !=0){
            return Subscriber::whereMonth(self::SEARCH_COLUMN,$this->month)->paginate(self::PAGE_SIZE)->toArray();
        }else if($this->year != 0 && $this->month ==0){
            return Subscriber::whereYear(self::SEARCH_COLUMN,$this->year)->paginate(self::PAGE_SIZE)->toArray();
        }else if($this->year != 0 && $this->month !=0){
            return Subscriber::whereYear(self::SEARCH_COLUMN,$this->year)
                               ->whereMonth(self::SEARCH_COLUMN,$this->month)
                               ->paginate(self::PAGE_SIZE)->toArray();
        }

        return Subscriber::paginate(self::PAGE_SIZE)->toArray();
        
    }

    private function searchKeys(){
        $key= [
            $this->year,$this->month
        ];

        return self::GENERAL_KEYS.'-'.implode('-',$key);
    }
     
}
