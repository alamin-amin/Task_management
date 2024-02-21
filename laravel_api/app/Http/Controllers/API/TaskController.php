<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class TaskController extends Controller
{

    public function index()
    {
        $task = Task::all();
        return response()->json([
            'status' => 200,
            'task' => $task,
        ]);
    }

    public function allCategory()
    {
        $category = Task::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function addTask(Request $request)
   
    {
        $validator = Validator::make($request->all(), [
            'title' => 'Required',
            'description' => 'Required',
            'status' => 'Required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $task = new Task;
            $task->title = $request->input('title');
            $task->description = $request->input('description');
            $task->status = $request->input('status');
            $task->date = $request->input('date');
            $task->save();
            return response()->json([
                'status' => 200,
                'message' => 'Task added successfully',
            ]);
        }
    }

    public function editTask($id)
    {
        $task = Task::find($id);
        if ($task) {
            return response()->json([
                'status' => 200,
                'task' => $task,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Task not found',
            ]);
        }
    }


    public function update(Request $request,$id){
        $validator = Validator::make($request->all(), [
            'title' => 'Required',
            'description' => 'Required',
            'status' => 'Required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {

            $task = Task::find($id);
            $task->title = $request->input('title');
            $task->description = $request->input('description');
            $task->status = $request->input('status');
            $task->save();
            return response()->json([
                'status' => 200,
                'message' => 'Task Updated successfully',
            ]);
        }
    }

    public function destroy($id)
    {
        $task = Task::find($id);
        if ($task) {
            $task->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Task delete successfully',
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Task not found',
            ]);
        }
    }

    // public function complteTask()
    // {
    //     $task = Task::where('status'->1=complte)->get();
    //     return response()->json([
    //         'status' => 200,
    //         'task' => $task,
    //     ]);
    // }
}
