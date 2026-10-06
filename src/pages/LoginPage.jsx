
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router'; // Best practice to import from react-router-dom

const LoginPage = () => {
  // 1. Move hook inside the component
  const navigate = useNavigate();

  // 2. Move handler inside so it can access the 'navigate' function
  const handleLogin = (values) => {
    // 3. Ensure destructuring matches the exact 'name' props from your Form.Items
    const { username, password } = values;

    // 4. Use strict equality (===)
    if (username === "admin" && password === "admin123") {
      message.success("Login successful!");
      navigate('/dashboard');
    } else {
      message.error("Incorrect username or password!");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "100px auto", border: "1px solid gray", borderRadius: "10px" }}>
      <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "20px", fontSize: "30px", fontFamily: "-moz-initial" }}>
        Login
      </h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "30px" }}
        initialValues={{ remember: true }}
        onFinish={handleLogin} // 5. Changed to onFinish
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;