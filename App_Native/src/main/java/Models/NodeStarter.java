package Models;

import java.util.Map;

import javax.servlet.Servlet;
import org.openqa.grid.common.RegistrationRequest;
import org.openqa.grid.internal.utils.SelfRegisteringRemote;
import org.openqa.grid.internal.utils.configuration.GridNodeConfiguration;
import org.openqa.grid.internal.utils.configuration.StandaloneConfiguration;
import org.openqa.grid.shared.GridNodeServer;

public class NodeStarter {

	static SelfRegisteringRemote remote;

	public static void startNode() {	

		try {
		
			GridNodeConfiguration nodeConfig = GridNodeConfiguration.loadFromJSON(GridNodeConfiguration.DEFAULT_NODE_CONFIG_FILE);
			RegistrationRequest request = new RegistrationRequest(nodeConfig);
			remote = new SelfRegisteringRemote(request);
			remote.startRegistrationProcess();

		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void stopNode() {
		System.exit(0);
	}

}
