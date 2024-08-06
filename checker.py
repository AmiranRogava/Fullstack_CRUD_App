import threading
import subprocess
import json

res = ""

def run_code():
    global res
    try:
        result = subprocess.run(['python', 'tempcode.py'], capture_output=True, text=True)
        stdout = result.stdout.strip()
        stderr = result.stderr.strip()
        if result.returncode == 0:
            res = stdout
        else:
            # Handle the error
            res = f"Error: {stderr}"

    except Exception as e:
        res = f"Error: {e}"

def check_answer(answer, expected_output):
    result = {"status": "Test passed!" if str(expected_output) == str(answer) else "Test failed!"}
    if result["status"] == "Test failed!":
        result["status"] += " >> expected "+str(expected_output)
        result["status"] += " got ' "+str(answer)+"'"
    print(result)
    return json.dumps(result, ensure_ascii=False, indent=4)

def check(tests):
    # Write test calls to tempcode.py
    with open('tempcode.py', 'a') as file:
        for call in tests.keys():
            file.write(f"\nprint({call})\n")

    # Run the code in a separate thread
    run_thread = threading.Thread(target=run_code)
    run_thread.start()
    run_thread.join()

    # Process results
    results = {}
    answers = res.split('\n')
    print(res)
  
    if "Error" in res:
        for k,v in tests.items():
            results[f"{k} --> {v}"] = res
    else:
        for idx, (test_code, expected_output) in enumerate(tests.items()):
            if idx < len(answers):
                result = check_answer(answers[idx], expected_output)
                results[f"{test_code} --> {expected_output}"] = [json.loads(result)["status"]]
    return results
