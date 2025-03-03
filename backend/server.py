from flask import Flask, request, jsonify
import hashlib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from the frontend

# Precomputed correct hashes (same as in frontend)
CORRECT_HASH1 = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
CORRECT_HASH2 = "5c2c7671b9f6c4242ba2d4c141c81293c3a2b2be5871181bbe30f0eb7ebedcef"

# Hidden flag (not visible in frontend)
FLAG = "iLink_Digital{C0ngr4tul4t!0n5_y0u_4r3_n0w_1_st3p_cl0s3r_t0_h4ck_th3_w0rld}"

def hash_input(input_str):
    """Hashes input using SHA-256"""
    return hashlib.sha256(input_str.encode()).hexdigest()

@app.route("/verify", methods=["POST"])
def verify_answers():
    try:
        data = request.json
        answer1 = data.get("answer1", "")
        answer2 = data.get("answer2", "")

        # Hash the inputs
        if hash_input(answer1) == CORRECT_HASH1 and hash_input(answer2) == CORRECT_HASH2:
            return jsonify({"success": True, "flag": FLAG})
        else:
            return jsonify({"success": False, "message": "Incorrect answers!"}), 401

    except Exception as e:
        return jsonify({"success": False, "message": "An error occurred!"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
