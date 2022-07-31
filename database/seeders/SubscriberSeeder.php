<?php

namespace Database\Seeders;

use App\Models\Subscriber;
use Exception;
use Illuminate\Database\Seeder;

class SubscriberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Subscriber::truncate();
        $date = date('Y-m-d H:i:s');
        $csvFile = fopen(base_path("database/data/subscribers.csv"), "r");
        $firstRow = true;
        while (($data = fgetcsv($csvFile,1000, ",")) !== FALSE) {
            if (!$firstRow) {
                try{
                    Subscriber::create([
                        "email" => $data['1'],
                        "name" => $data['2'],
                        "birth_day" => $data['3'],
                        "phone" => $data['4'],
                        "ip" => $data['5'],
                        "country" => $data['6']
                    ]); 
                }catch(Exception $e){
                   logger("Some data is not valid:".$e->getMessage());
                }
                  
            }
            $firstRow = false;
        }

        fclose($csvFile);

    }
}
