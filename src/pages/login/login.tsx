import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Credentials } from "../../type";
import { login, self } from "../../http/api";
import { useAuthStore } from "../../store";

const loginUser = async (credentials: Credentials) => {
  // server call
  const { data } = await login(credentials);
  return data;
};

const getSelf = async () => {
  const { data } = await self()
  return data
}

const LoginPage = () => {

  const { setUser } = useAuthStore();

  const { data: selfData , refetch} = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false,
  })

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"], // ai key mainly cache er jonno use hoy . 'login' key word ta diye internally kono ek vabe chaching perform kore

    mutationFn: loginUser, // ai function e server call hobe

    onSuccess: async () => {
      const selfDataPromise = await refetch();
      setUser(selfDataPromise.data)
      console.log(selfDataPromise.data)
      console.log("User Login Successfully!");
    }, // jokhon loginUser function success , mane holo server response success pacche tokhon ai function call hobe
  });

  return (
    <>
      <Layout
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <Space orientation="vertical" align="center" size={"large"}>
          <Layout.Content>
            <Logo />
          </Layout.Content>
          <Card
            bordered={false}
            title={
              <Space
                style={{
                  width: "100%",
                  fontSize: 16,
                  justifyContent: "center",
                }}
              >
                <LockFilled />
                Sign in
              </Space>
            }
            style={{ width: 300 }}
          >
            <Form
              initialValues={{ remember: true }}
              onFinish={(values) => {
                mutate({
                  email: values.username,
                  password: values.password,
                });
                console.log(values);
              }}
            >
              <Form.Item
                name={"username"}
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                  },
                  {
                    type: "email",
                    message: "Email is not Valid",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item name={"password"}>
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Flex justify="space-between">
                <Form.Item name={"remember"} valuePropName="checked">
                  <Checkbox>Remember Me</Checkbox>
                </Form.Item>
                <a href="#" style={{ paddingTop: "8px", fontSize: "12px" }}>
                  Forgot Password
                </a>
              </Flex>
              {
                isError && (<Alert type="error" message={error.message} />)
              }
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={isPending}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
