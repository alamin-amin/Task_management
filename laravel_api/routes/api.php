<?php
 use App\Http\Controllers\API\AuthController;
 use App\Http\Controllers\API\TaskController;
 use Illuminate\Support\Facades\Route;

Route::post('login',[AuthController::class,'userLogin']);
Route::post('register',[AuthController::class,'register']);
Route::middleware(['auth:sanctum'])->group( function() {
    Route::post('logout',[AuthController::class,'logout']);
});

Route::post('/add-task',[TaskController::class,'addTask']);
Route::get('/all-task',[TaskController::class,'index']);
Route::get('/allCompleteTask',[TaskController::class,'allCompleteTask']);
Route::get('/edit-task/{id}',[TaskController::class,'editTask']);
Route::put('/update-task/{id}',[TaskController::class,'update']);
Route::delete('/delete-task/{id}',[TaskController::class,'destroy']);
Route::put('/complete-tasks/{id}',[TaskController::class,'completeTask']);
// Route::get('/all-incomplete',[TaskController::class,'incompleteTask']);
