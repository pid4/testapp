<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->library('session');
		$this->load->database('default');
		header("Access-Control-Allow-Origin: *");
		header('Content-Type: application/json');
	}

	public function index(){
		$this->load->view('welcome_message');
	}

	public function login(){
		// echo json_encode();
		$response_data['user_details'] = '';
		$response_data['status'] = '';
		$response_data['api_msg'] = '';
		$response_data['email']='';
		$email = $this->input->post('email');
		$password = $this->input->post('password');
		//$this->session->set_userdata('email',$email);
		// $this->db->where("", "");
		// $this->db->get("");
		// $this->db->query("");
		// $this->db->insert("", $arr);
		// $this->db->update("", $arr);
		// $this->db->delete("");

		$this->db->where('email', $email);
		$this->db->where('password', $password);
		$this->session->set_userdata('email',$email);
		$user_exist = $this->db->get("user");
		$userid=$user_exist->row('userid');
		$this->session->set_userdata('userid',$userid);




		if($user_exist->num_rows() > 0) {
			$response_data['status'] = 'success';
			$response_data['api_msg'] = 'success';
			$response_data['user_details'] = $user_exist->row();
		} else {
			$response_data['status'] = 'failed';
			$response_data['api_msg'] = 'Email Id Password does not match';
		}

		echo json_encode($response_data);


		// $arr = array(
		// 		'email' => $email,
		// 		'password' => $password,
		// 	);

		// $this->db->insert("Login", $arr);

		// $result = $this->db->get();

		// $result->row()->email;
		// foreach ($result->results() as $key => $value) {
		// 	echo $value->email;
		// }
		// echo $this->input->post('password');
	}

	public function signup(){

		$response_data['user_details'] = '';
		$response_data['status'] = '';
		$response_data['api_msg'] = '';
		
		$name = $this->input->post('name');
		$email = $this->input->post('email');
		$phoneno = $this->input->post('phoneno');
		$password = $this->input->post('password');
		$gender = $this->input->post('gender');
		$dob = $this->input->post('dob');
		$city = $this->input->post('city');


		// $name="hi";
		// $email="hello";
		// $phoneno="12312";
		// $password="hi";
		// $gender="female";
		// $dob="2018-03-12";
		// $city="mum";


		
		$this->db->where('email', $email);
		$this->db->where('phoneno', $phoneno);
		$user_exist = $this->db->get("user");

		$arr = array(
			'name' => $name,
			'email' => $email,
			'phoneno' => $phoneno,
			'password' => $password,
			'gender' => $gender,
			'dob' => $dob,
			'city' => $city,
			 	);

		if($user_exist->num_rows() > 0) {
			$response_data['status'] = 'failed';
			$response_data['api_msg'] = 'EmailID or phone no already exists';
		} else {
			
			$response_data['status'] = 'success';
			$response_data['api_msg'] = 'success';
			$this->db->insert("user", $arr);
			echo json_encode($response_data);
		}

	}
	
	public function search(){

		$query = $this->input->post('query');
		$response_data['user_details'] = '';
		$response_data['status'] = '';
		$response_data['api_msg'] = '';
		$q=$query;
		$s="select * from adpost where adtitle like '%$q%'";
		// $s="select * from adpost";
		
		$user_exist = $this->db->query($s);
		$response_data['user_details'] = $user_exist->result();
		/*$arr = array(
			'name' => $name,
			'email' => $email,
			'phoneno' => $phoneno,

			'password' => $password,
			'gender' => $gender,
			'dob' => $dob,
			'city' => $city,
			 	);
		*/
		if($user_exist->num_rows() > 0) {
			$response_data['status'] = 'success';
		} else {
			$response_data['status'] = 'failed';
			$response_data['api_msg'] = 'failed';	
		}
			echo json_encode($response_data);
	}

	public function home(){
		$response_data['adpost'] = '';
		$response_data['status'] = 'success';
		$response_data['api_msg'] = '';
		$s="select * from adpost";
		$ad_exist = $this->db->query($s);
		$response_data['adpost'] = $ad_exist->result();
		echo json_encode($response_data);
	
	
	}
	
	


	public function adpost(){

		$response_data['user_details'] = '';
		$response_data['status'] = '';
		$response_data['api_msg'] = '';
		
		$adtitle = $this->input->post('adtitle');
		$phoneno = $this->input->post('phoneno');
		$category = $this->input->post('category');
		$description = $this->input->post('description');
		$rentperday = $this->input->post('rentperday');
		$maxdays = $this->input->post('maxdays');
		$depositamt = $this->input->post('depositamt');
		$city = $this->input->post('city');
		$email= $this->session->userdata('email');
		$userid= $this->session->userdata('userid');

		// $this->db->where('email', $email);
		// $this->db->where('phoneno', $phoneno);
		// $user_exist = $this->db->get("user");

		$arr = array(
			'adtitle' => $adtitle,
			'phoneno' => $phoneno,
			'category' => $category,
			'description' => $description,
			'rentperday' => $rentperday,
			'maxdays' => $maxdays,
			'depositamt' => $depositamt,
			'city' => $city,
			'email'=>$email,
			'userid'=>$userid
				);

			
			$response_data['status'] = 'success';
			$response_data['api_msg'] = 'success';
			$this->db->insert("adpost", $arr);
			echo json_encode($response_data);

	}

	public function account_details(){
		$response_data['user_details'] = '';
		$response_data['status'] = '';
		$response_data['api_msg'] = '';
		$response_data['status'] = 'success';
		$response_data['api_msg'] = 'success';
		$email= $this->session->userdata('email');
		$this->db->where('email', $email);
		$user = $this->db->get("user");
		$response_data['user_details'] = $user->row();
		echo json_encode($response_data);


	}

	public function updatedetails(){
	   $response_data['status'] = '';
	   $userid = $this->input->post("userid");
	   $phoneno = $this->input->post("phoneno");
	   $city = $this->input->post("city");
	   $this->db->from("user");
       $this->db->where("userid", $userid);
       $data = array(
                'phoneno' => $phoneno,
                'city' => $city
            );
            if ($this->db->update('user', $data)) {
                $response_data['status'] = 'success';
            }
            else
            {
            	 $response_data['status'] = 'failed';
            }
            echo json_encode($response_data);
	}
	public function sbc(){

		$c = $this->input->post('category');
		$response_data['user_details'] = '';
		$response_data['status'] = '';
		$response_data['api_msg'] = '';
		$s="select * from adpost where category like '%$c%'";
		// $s="select * from adpost";
		
		$user_exist = $this->db->query($s);
		$response_data['api_msg'] = $s;

		$response_data['user_details'] = $user_exist->result();
		if($user_exist->num_rows() > 0) {
			$response_data['status'] = 'success';
		} else {
			$response_data['status'] = 'failed';
			//$response_data['api_msg'] = 'failed';	
		}
			echo json_encode($response_data);
	}
}